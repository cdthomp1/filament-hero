const fetcher = async (...args) => {
    const res = await fetch(...args)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

const dirtyFetcher = async (...args) => {
    const res = await fetch(...args)

    return res
}

exports.fetcher = fetcher
exports.dirtyFetcher = dirtyFetcher