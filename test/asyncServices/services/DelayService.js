class DelayService {
}

export default () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new DelayService())
        }, 50);
    });
}