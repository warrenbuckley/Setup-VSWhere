import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as path from 'path';
import * as fs from 'fs';

async function run() {
  try {

    // Tripple check it's Windows process
    // Can't install VSWhere.exe for Ubuntu image etc..
    const IS_WINDOWS = process.platform === 'win32';
    if(IS_WINDOWS === false){
      core.setFailed("VSWhere.exe only works for Windows.");
      return;
    }

    // Try & find tool in cache
    let directoryToAddToPath:string;
    directoryToAddToPath = await tc.find("vswhere", "2.7.1");

    if(directoryToAddToPath){
      core.debug(`Found local cached tool at ${directoryToAddToPath} adding that to path`);
      await core.addPath(directoryToAddToPath);
      return;
    }


    // Download VSWhere 2.7.1 release
    core.debug("Downloading VSWhere v2.7.1 tool");
    const vsWherePath = await tc.downloadTool("https://github.com/microsoft/vswhere/releases/download/2.7.1/vswhere.exe");

    // Rename the file which is a GUID without extension
    var folder = path.dirname(vsWherePath);
    var fullPath = path.join(folder, "vswhere.exe");
    fs.renameSync(vsWherePath, fullPath);

    //Cache the directory with VSWhere in it - which returns a NEW cached location
    var cachedToolDir = await tc.cacheDir(folder, "vswhere", "2.7.1");
    core.debug(`Cached Tool Dir ${cachedToolDir}`);

    // Add vswhere.exe CLI tool to path for other steps to be able to access it
    await core.addPath(cachedToolDir);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
