import "./desc.css";
import { useEffect } from 'react';

function Popup(props) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        props.setDesc({ state: false, tag: null, text: null, desc: null });
      }
    };

    // Add listener when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Clean up listener when component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [props]); // Re-run if props change

  return (
    <div className="descContainer">
      <div className="desc">
        <input type="text" disabled="true" value={`@${props.tag} ${props.text} / ${props.desc}`} />
      </div>
    </div>
  );
}
export default Popup;
