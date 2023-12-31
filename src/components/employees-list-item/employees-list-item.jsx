import './employees-list-item.scss';

const EmployeesListItem = (props) => {
        const {name, salary, onDelete, increase, rise, onToggleProp} = props

        let classNames = "list-group-item d-flex justify-content-between"
        if (increase) {
            classNames += ' increase'
        }
        if (rise) {
            classNames += ' like'
        }

        return (
            <li className={classNames}>
                <span
                    className="list-group-item-label"
                    data-toggle="rise"
                    onClick={onToggleProp}
                >{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={salary + "$"}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                            data-toggle="increase"
                            onClick={onToggleProp}
                            className="btn-cookie btn-sm ">
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button type="button"
                            onClick={onDelete}
                            className="btn-trash btn-sm ">
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }


export default EmployeesListItem;