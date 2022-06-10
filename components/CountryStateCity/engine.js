const engine =
  (Component) =>
  // eslint-disable-next-line react/display-name
  ({ ...props }) => {
    return <Component {...props} {...{}} />;
  };

export default engine;
