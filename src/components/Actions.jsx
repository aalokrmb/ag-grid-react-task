import Action from "./Action"

const Actions = ({ actions }) => {

  return (
    <div>
      {actions.map(action => <Action key={action.title} action={action} />)}
    </div>
  )
}

export default Actions;