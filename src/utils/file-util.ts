export function handleDownload(filename: string, blob: Blob): void {
  // 创建隐藏的可下载链接
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename; // 自定义文件名和扩展名
  a.style.display = 'none';
  document.body.appendChild(a);
  // 点击下载链接
  a.click();
  // 清除临时创建的对象URL
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export function getDownFileName(res: { headers: { [key: string]: string } }): string {
  return res.headers['content-disposition'].split('filename=')[1];
}