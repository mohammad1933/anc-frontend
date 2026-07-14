/**
 * Captures the current WebGL canvas at its native resolution and downloads
 * it as a PNG. The canvas must be rendered with `preserveDrawingBuffer: true`
 * for `toDataURL` to reflect the latest frame reliably.
 */
export function downloadCanvasScreenshot(canvas: HTMLCanvasElement, fileName = "atelier-configuration"): void {
  const dataUrl = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  link.href = dataUrl;
  link.download = `${fileName}-${timestamp}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
