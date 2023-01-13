import BaseRepository from './BaseRepository'

class UserRepository extends BaseRepository {
    url () {
        return '/'
    }

    handlerHttpError (e: any) {
        if (e.response && e.response.data) {
            let errorMsg = e.response.data.msg
            return this.error(errorMsg)
        } else {
            throw e
        }
    }

    async signIn (data: any, query = {}, headers = {}) {
        try {
            let response = await this.httpClient.post(this.url() + 'user/sign/in', data, { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }

    async signUp (data: any, query = {}, headers = {}) {
        try {
            let response = await this.httpClient.post(this.url() + 'user/sign/up', data, { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }

    async googleLogin (query = {}, headers = {}) {
        try {
            let response = await this.httpClient.get(this.url() + 'oauth/google/login', { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }

    async googleLoginCallback (query = {}, headers = {}) {
        try {
            let response = await this.httpClient.get(this.url() + 'oauth/google/callback', { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }

    async resetPassword (data: any, query = {}, headers = {}) {
        try {
            let response = await this.httpClient.post(this.url() + 'user/reset-password', data, { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }

    async createPassword (data: any, query = {}, headers = {}) {
        headers = {
            "Authorization": 'Bearer ' + data.token
        }
        try {
            let response = await this.httpClient.post(this.url() + 'user/create-password', data, { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }
}

export default UserRepository
