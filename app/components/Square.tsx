interface SquareProps {
    value: string | null;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({value, onClick}) => {
    if (value === "1"){
        return (<div className='w-[60px] h-[60px] border-[16px] rounded-full border-purple-5' onClick={onClick}></div>)
      }
      else if (value === "2"){
        return (<div className='w-[60px] h-[60px] border-[16px] border-green-3' onClick={onClick}></div>)
      }
      else {
        return (<div className='w-[60px] h-[60px] rounded-lg bg-beige-3' onClick={onClick}></div>)
      }
}

export default Square;