import RNFetchBlob from 'react-native-fetch-blob';

const dirs = RNFetchBlob.fs.dirs;

class DownloadManager {
  static download(id, url) {
    return RNFetchBlob.config({
      path: `${dirs.DocumentDir}/${id}.mp3`
    }).fetch('GET', url, {});
  }
  static async getUrl(id, url) {
    const localUrl = `${dirs.DocumentDir}/${id}.mp3`;
    const exist = await RNFetchBlob.fs.exists(localUrl);
    if (exist) return `file://${localUrl}`;
    return url;
  }
}

export default DownloadManager;
