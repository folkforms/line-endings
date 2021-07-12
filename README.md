# line-endings

Checks and/or writes line endings.

## Options

- `-l/--line-ending LF/CRLF/CR` Line ending to use
- `-c/--check <path>` Check line endings and fail if any do not match the specified line ending
- `-w/--write <path>` Fix any files that do not match the specified line ending

`-l/--line-ending` and at least one of `-c/--check` or `-w/--write` must be specified.

You can create a `.line-endings-ignore` file to ignore certain folders.
