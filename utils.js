const path = require("path");
const { fromFile } = require('file-type');

const getRootDir = () => path.parse(process.cwd()).root;

const getIcon = async (fileName, filePath) => {
  if (filePath.endsWith("/")) return "folder.png";

  let ext;
  if (!fileName.includes(".")) {
    try {
      const fileInfo = await fromFile(filePath);
      ext = fileInfo.ext;
    } catch (err) {
      ext = "icon.png";
    }
  } else {
    ext = path.extname(filePath).split('.')[1];
  }

  switch (ext.toLowerCase()) {
    case "gif":
    case "icns":
    case "ico":
    case "jpeg":
    case "jpg":
    case "pjp":
    case "png":
    case "svg":
    case "tif":
    case "bmp":
    case "psd":
      return "img.png";

    case "xlam":
    case "xlam":
    case "xlsb":
    case "xlsm":
    case "xlsx":
    case "xltx":
    case "xls":
    case "csv":
    case "numbers":
      return "excel.png";

    case "pdf":
      return "pdf.png";

    case "js":
      return "js.png";

    case "arvisworkflow":
    case "arvisplugin":
    case "arvistheme":
      return "arvis.png";

    case "mhtml":
    case "html":
      return "html.png";

    case "css":
      return "css.png";

    case "zip":
      return "zip.png";

    case "apk":
    case "rar":
    case "7z":
    case "tar":
    case "gzip":
    case "lzip":
    case "egg":
    case "alz":
    case "gz":
      return "archive.png";

    case "mp3":
    case "wav":
    case "ogg":
    case "wma":
      return "audio.png";

    case "avi":
    case "wmv":
    case "mkv":
    case "flv":
    case "mov":
    case "mpg":
    case "swf":
    case "mp4":
    case "mpeg":
      return "video.png";

    case "json":
      return "json.png";

    case "xml":
      return "xml.png";

    case "ts":
      return "ts.png";

    case "hpp":
    case "cpp":
      return "cpp.png";

    case "exe":
    case "app":
      return "program.png";

    case "ppt":
    case "pptx":
    case "pptm":
    case "ppsm":
    case "ppam":
    case "ppa":
      return "ppt.png";

    case "txt":
    case "rtf":
    case "hwp":
    case "odt":
      return "text.png";

    case "doc":
    case "docx":
    case "dotx":
    case "dot":
    case "docm":
      return "doc.png";

    case "java":
      return "java.png";

    case "go":
      return "golang.png";

    case "c":
    case "h":
      return "clang.png";
  }

  return "icon.png";
};

module.exports = {
  getIcon,
  getRootDir,
};
