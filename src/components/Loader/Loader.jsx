import { Hourglass } from 'react-loader-spinner';
import './Loader.css';

export const Loader = () => {
  return (
    <div className="Loader">
      <Hourglass
        strokeColor="#3f51b590"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};
