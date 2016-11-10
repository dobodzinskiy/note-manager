import $ from 'jquery';

export function getDirectories() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/directories',
            type: 'GET',
            success: (data) => {
                resolve(data);
            },
            error: (xhr) => {
                reject(xhr);
            }
        })
    })
}

export function postDirectory(directory) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/directories/',
            data: JSON.stringify(directory),
            type: 'POST',
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            success: (data) => {
                resolve(data);
            },
            error: (xhr) => {
                reject(xhr)
            }
        })
    })
}

export function putDirectory(directory) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: './directories/' + directory.id,
            data: JSON.stringify(directory),
            type: 'PUT',
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            success: (data) => {
                resolve(data);
            },
            error: (xhr) => {
                reject(xhr)
            }
        })
    })
}

export function deleteDirectory(directory) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/directories/' + directory.id,
            type: 'DELETE',
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            success: (data) => {
                resolve(data);
            },
            error: (xhr) => {
                reject(xhr)
            }
        })
    })
}