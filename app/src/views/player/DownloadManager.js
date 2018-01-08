import RNFetchBlob from 'react-native-fetch-blob';

const dirs = RNFetchBlob.fs.dirs;

class DownloadManager {
  static download(id, url) {
    return RNFetchBlob.config({
      path: `${dirs.DocumentDir}/${id}.mp3`
    }).fetch('GET', url, {});
  }
  static async getUrl(id, remoteUrl) {
    const localUrl = `${dirs.DocumentDir}/${id}.mp3`;
    const exists = await RNFetchBlob.fs.exists(localUrl);
    let url = remoteUrl;
    if (exists) url = `file://${localUrl}`;
    return url;
  }
  static async exists(id) {
    if (!id) return false;
    const localUrl = `${dirs.DocumentDir}/${id}.mp3`;
    const exists = await RNFetchBlob.fs.exists(localUrl);
    return exists;
  }
}

export default DownloadManager;
