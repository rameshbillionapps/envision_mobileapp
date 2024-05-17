package com.envision;
import android.content.Intent;
import android.content.res.Configuration;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.reactnativenavigation.controllers.SplashActivity;
import android.os.Bundle;
import android.content.pm.ActivityInfo;

public class MainActivity extends SplashActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT); // Make to run your application only in portrait mode
      //setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE); // Make to run your application only in LANDSCAPE mode
      //setContentView(R.layout.disable_android_orientation_change);
  }
}
