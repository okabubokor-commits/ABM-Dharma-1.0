const heritageImages = import.meta.glob<string>('./heritage/*', {
  eager: true,
  import: 'default',
  query: '?url'
});

export function offlineImage(publicPath: string): string {
  const fileName = publicPath.replace(/^\/+/, '');
  const image = heritageImages[`./heritage/${fileName}`];

  if (!image) {
    throw new Error(`Missing bundled offline image: ${publicPath}`);
  }

  return image;
}
