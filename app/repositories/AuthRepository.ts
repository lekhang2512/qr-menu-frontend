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
}

export default UserRepository
