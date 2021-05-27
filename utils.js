const path = require("path");

const getRootDir = () => path.parse(process.cwd()).root;

const getIcon = (fileName) => {
  if (!fileName.includes(".")) return "icon.png";
  const ext = fileName.split(".")[1];

  switch (ext) {
    case "gif":
    case "icns":
    case "ico":
    case "jpeg":
    case "jpg":
    case "pjp":
    case "png":
    case "svg":
      return "img.png";

    case "xlam":
    case "xlam":
    case "xlsb":
    case "xlsm":
    case "xlsx":
    case "xltx":
      return "excel.png";

    case "pdf":
      return "pdf.png";

    case "js":
      return "js.png";

    case "arvisworkflow":
    case "arvisplugin":
    case "arvistheme":
      return "arvis.png";

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
      return "video.png";

    case "json":
      return "json.png";
  }

  return "icon.png";
};

module.exports = {
  getIcon,
  getRootDir,
};
