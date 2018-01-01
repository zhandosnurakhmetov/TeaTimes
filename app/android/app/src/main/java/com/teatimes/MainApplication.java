package com.teatimes;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import guichaguri.trackplayer.TrackPlayer;
import com.slowpath.actionsheet.ActionSheetPackage;
import fm.indiecast.rnaudiostreamer.RNAudioStreamerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.chirag.RNMail.RNMail;
import com.reactlibrary.RNRatePackage;
import cl.json.RNSharePackage;
import com.beefe.picker.PickerViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new TrackPlayer(),
            new ActionSheetPackage(),
            new RNAudioStreamerPackage(),
            new RNSoundPackage(),
            new RNMail(),
            new RNRatePackage(),
            new RNSharePackage(),
            new PickerViewPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
