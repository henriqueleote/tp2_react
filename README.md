# ProtectU - ReactNative

## How to install

1. First of all, create a new Pixel 4XL with Android 11 and API 30. There is no need to create an Android Studio project, you can access the Device Manager in the top right corner on the "Project Chooser" page.

2. Go to Control Panel > User Accounts > User Accounts > Change my
   environment variables (left side) > New  
   Add a variable with the name ANDROID_HOME and the value c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk  
   Then, go to the variable PATH, double click, add a new line and add the value -> C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools

3. Clone the repository, open with VSCode.
   In command prompt:

```bash
cd your_path/tp2_react
code .
```

## Run the app in the emulator

In command prompt:

```bash
cd your_path/tp2_react
npx react-native run-android
//The emulator opens automatically
```
