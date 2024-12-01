## Publish to npm

```bash
./publish.sh <TYPE>
```

Where `<TYPE>` can be `patch`, `minor`, or `major`.

This will create a new changeset and publish the new version to npm.

### Publish as patch

```bash
./publish.sh --patch
```

### Publish as minor

```bash
./publish.sh --minor
```

### Publish as major

```bash
./publish.sh --major
```
