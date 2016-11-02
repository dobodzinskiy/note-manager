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
                reject(JSON.parse(xhr.responseText));
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
                reject(JSON.parse(xhr.responseText))
            }
        })
    })
}

export function putDirectory(directory) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: './directories/' + directory.id,
            data: directory,
            type: 'PUT',
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            success: (data) => {
                resolve(data);
            },
            error: (xhr) => {
                reject(JSON.parse(xhr.responseText))
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
                reject(JSON.parse(xhr.responseText))
            }
        })
    })
}