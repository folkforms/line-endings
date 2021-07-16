# line-endings

Checks and/or writes line endings.

## Options

- `-l/--line-ending LF/CRLF` Line ending to use
- `-c/--check <path>` Check line endings and fail if any do not match the specified line ending
- `-w/--write <path>` Fix any files that do not match the specified line ending
- `-i/--ignore <path>` Use the given ignore file. Will default to `.gitignore` if not specified.

`-l/--line-ending` and at least one of `-c/--check` or `-w/--write` must be specified.

By default, will ignore any file ignored by `.gitignore`.
