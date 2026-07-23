/**
 * Captures the current WebGL canvas at its native resolution and downloads
 * it as a PNG. The canvas must be rendered with `preserveDrawingBuffer: true`
 * for `toDataURL` to reflect the latest frame reliably.
 */
export async function downloadCanvasScreenshot(canvas: HTMLCanvasElement, fileName = "atelier-configuration", roomPhotoUrl?: string | null): Promise<void> {
  let dataUrl = canvas.toDataURL("image/png", 1.0);
  if (roomPhotoUrl) {
    const output = document.createElement("canvas");
    output.width = canvas.width;
    output.height = canvas.height;
    const context = output.getContext("2d");
    const room = new Image();
    room.src = roomPhotoUrl;
    await room.decode();
    const scale = Math.max(output.width / room.naturalWidth, output.height / room.naturalHeight);
    const width = room.naturalWidth * scale;
    const height = room.naturalHeight * scale;
    context?.drawImage(room, (output.width - width) / 2, (output.height - height) / 2, width, height);
    context?.drawImage(canvas, 0, 0, output.width, output.height);
    dataUrl = output.toDataURL("image/png", 1.0);
  }
  const link = document.createElement("a");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  link.href = dataUrl;
  link.download = `${fileName}-${timestamp}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
