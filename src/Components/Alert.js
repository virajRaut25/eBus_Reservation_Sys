import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {
        if (word === "danger") {
          word = "error";
        }
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      };
      return (
        <div style={{ height: "52px", position:"relative", top: "4rem", zIndex: 2 }}>
          {props.alert && (
            <div className={`alert alert-${props.alert.type}`} role="alert">
              <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>
          )}
        </div>
      );
}
