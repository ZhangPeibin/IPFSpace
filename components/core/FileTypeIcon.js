import * as React from "react";
import * as SVG from "../../common/svg";
import * as Validations from "../../common/validations";
import {DesktopEye, FileNotFound, Sun} from "../../common/svg";

export function FileTypeIcon({ file, ...props }) {
  const type = props.type;
  const isLink = false;
  const encrypt = props.encrypt
  if(encrypt){
    return <SVG.EyeOff {...props} />
  }

  if (isLink) {
    return <SVG.Link {...props} />;
  }

  if (Validations.isImageType(type)) {
    return <SVG.Image {...props} />;
  }

  if (Validations.isVideoType(type)) {
    return <SVG.Video {...props} />;
  }

  if (Validations.isAudioType(type)) {
    return <SVG.Sound {...props} />;
  }

  if (Validations.isEpubType(type)) {
    return <SVG.Book {...props} />;
  }

  if (Validations.isPdfType(type)) {
    return <SVG.TextDocument {...props} />;
  }
  return <SVG.Document {...props} />;
}

export function FileTypeGroup(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        ...props.style,
      }}
    >
      <SVG.Sound height="24px" style={{ margin: "0 16px" }} />
      <SVG.Document height="24px" style={{ margin: "0 16px" }} />
      <SVG.Image height="24px" style={{ margin: "0 16px" }} />
      <SVG.Book height="24px" style={{ margin: "0 16px" }} />
      <SVG.Video height="24px" style={{ margin: "0 16px" }} />
    </div>
  );
}
