import { apiUrl } from '../utils/apiUrl'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const addNewTask = async( data, jwsToken ) => {

    let added

    await fetch(apiUrl('todos'), {
        method: 'POST',
        headers: {
            'authorization': jwsToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        console.log(res)
        if (res.ok) {
            added = {
                status: true,
                content: res.text()
            }
        } else {
            added = {
                status: false,
                content: res.json()
            }
        }
    }).catch(err => {
        added = {
            status: false,
            content: err.json()
        }
    })

    return added

}

export const changeStatusTask = ( todo, jwsToken ) => {
    fetch(apiUrl(`todos/${todo.id}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: jwsToken
        },
        body: JSON.stringify({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
            dueDate: todo.dueDate,
            completed: !todo.completed,
        })
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            console.log('error')
        }
    }).then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
}

export const deleteSelectedTask = ( todo, jwsToken ) => {

    const MySwal = withReactContent(Swal)

    fetch(apiUrl(`todos/${todo.id}`), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: jwsToken
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            console.log('error')
        }
    }).then(data => {
        console.log(data)
        MySwal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
    }).catch(err => {
        console.log(err)
    })
}
