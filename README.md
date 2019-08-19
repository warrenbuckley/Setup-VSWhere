
# setup-vswhere

This action sets up VSWhere.exe as a CLI tool for use in actions by:
- optionally downloading and caching a version of VSWhere.exe and adds to PATH for future steps to use

https://github.com/microsoft/vswhere

# Usage

Basic:
```yaml
steps:
name: ASP.NET CI
on: [push]
jobs:
  build:
    runs-on: windows-latest

    steps:
    - uses: actions/checkout@master

    - name: Setup VSWhere.exe
      uses: warrenbuckley/Setup-VSWhere@v1

    - name: VSWhere MSBuild
      run: vswhere -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\MSBuild.exe
```


# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

# Contributions

Contributions are welcome!  See [Contributor's Guide](docs/contributors.md)