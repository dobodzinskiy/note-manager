import $ from 'jquery';

export function getNotices() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/notices',
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

export function postNotice(notice) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/notices',
            data: JSON.stringify(notice),
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

export function putNotice(notice) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: './notices/' + notice.id,
            data: JSON.stringify(notice),
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

export function deleteNotice(notice) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/notices/' + notice.id,
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