import React from 'react';

const ProgressBar = ({ progress }: { progress: number }) => {
  const initialRadius = 40;
  let finalRadius = progress > 99 ? initialRadius : 0;
  const outerDivStyles = {
    height: '40px',
    width: '40%',
    backgroundColor: 'whitesmoke',
    borderRadius: initialRadius,
    margin: '10px',
  };

  const innerDivStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#00e5b0',
    borderBottomLeftRadius: initialRadius,
    borderTopLeftRadius: initialRadius,
    borderBottomRightRadius: finalRadius,
    borderTopRightRadius: finalRadius,
  };

  const progressText = {
    padding: 10,
    color: '#11172e',
    fontWeight: 500,
  };

  return (
    <div data-testid="progres-bar" style={outerDivStyles}>
      <div data-testid="progres-bar-inner-div" style={innerDivStyles}>
        <div
          data-testid="progres-bar-text"
          style={progressText}
        >{`${progress}%`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
