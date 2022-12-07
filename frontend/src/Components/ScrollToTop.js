const ScrollToTop = () => {
  const style = {
    fontSize: "3rem",
    color: "#222",
    backgroundColor: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(3px)",
    boxShadow: "2px 2px 8px 0px rgba(156, 156, 156, 0.8)",
    borderRadius: "50%",
    position: "fixed",
    right: "0",
    bottom: "0",
    margin: "4rem",
    zIndex: "0",
    cursor: "pointer",
  };

  return (
    <a href="/#" className="scroll-to-top-btn">
      <i className="ri-arrow-up-circle-line" style={style}></i>
    </a>
  );
};

export default ScrollToTop;
