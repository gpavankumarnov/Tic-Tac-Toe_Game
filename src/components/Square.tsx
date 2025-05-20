
const Square = (props:{ onClick:()=>void, value:string|null}) => {
   const {onClick, value} = props;
   
  return (
    
    <button onClick={onClick} style={{width: "100px",
      height: "100px", border:'1px solid', boxSizing:'border-box', textAlign:'center'}}>{value}</button>

  )
}

export default Square
