const path = require("path");
const { fromFile } = require('file-type');

const getRootDir = () => path.parse(process.cwd()).root;

const getIcon = async (fileName, filePath) => {
  if (filePath.endsWith("/")) return "icons/folder.png";

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

  if (!ext) return "icon.png";

  switch (ext.toLowerCase()) {
    case "jpeg":
    case "jpg":
    case "png":
    case "svg":
      return filePath;

    case "pjp":
    case "icns":
    case "ico":
    case "gif":
    case "tif":
    case "bmp":
    case "psd":
      return "icons/img.png";

    case "xlam":
    case "xlam":
    case "xlsb":
    case "xlsm":
    case "xlsx":
    case "xltx":
    case "xls":
    case "csv":
    case "numbers":
      return "icons/excel.png";

    case "pdf":
      return "icons/pdf.png";

    case "js":
      return "icons/js.png";

    case "arvisworkflow":
    case "arvisplugin":
    case "arvistheme":
      return "icons/arvis.png";

    case "mhtml":
    case "html":
      return "icons/html.png";

    case "css":
      return "icons/css.png";

    case "zip":
      return "icons/zip.png";

    case "apk":
    case "rar":
    case "7z":
    case "tar":
    case "gzip":
    case "lzip":
    case "egg":
    case "alz":
    case "gz":
      return "icons/archive.png";

    case "mp3":
    case "wav":
    case "ogg":
    case "wma":
      return "icons/audio.png";

    case "avi":
    case "wmv":
    case "mkv":
    case "flv":
    case "mov":
    case "mpg":
    case "swf":
    case "mp4":
    case "mpeg":
      return "icons/video.png";

    case "json":
      return "icons/json.png";

    case "xml":
      return "icons/xml.png";

    case "ts":
      return "icons/ts.png";

    case "hpp":
    case "cpp":
      return "icons/cpp.png";

    case "exe":
    case "app":
      return "icons/program.png";

    case "ppt":
    case "pptx":
    case "pptm":
    case "ppsm":
    case "ppam":
    case "ppa":
      return "icons/ppt.png";

    case "txt":
    case "rtf":
    case "hwp":
    case "odt":
      return "icons/text.png";

    case "doc":
    case "docx":
    case "dotx":
    case "dot":
    case "docm":
      return "icons/doc.png";

    case "java":
      return "icons/java.png";

    case "go":
      return "icons/golang.png";

    case "c":
    case "h":
      return "icons/clang.png";
  }

  return "icon.png";
};

module.exports = {
  getIcon,
  getRootDir,
};
