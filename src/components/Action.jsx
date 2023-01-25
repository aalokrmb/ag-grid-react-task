const Action = ({action: { icon, onClick, title}}) => {

  return (
    <span style={{ margin: 10 }} onClick={onClick}><i title={title} className={icon}></i></span>
  )
}

export default Action;