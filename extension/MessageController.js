import Util from "./Util.js";
import API from "./API.js";

class MessageController {

    #input
    #button
    #clickEvent = new Event("click", {bubbles: true})
    #inputEvent = new Event("input", {bubbles: true})
    #keyDownEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 13, // For older browsers
        which: 13, // For older browsers
        code: "Enter",
        bubbles: true,
        cancelable: true
    })

    #lastChatId
    #start = false

    #ChatTimer

    /**@type {string[]} */
    #chatList = []

    init = async (input, button) => {
        this.#input = input
        this.#button = button
        this.#startSendChatTimer()

        const res = await API.getBidNow()

        console.log("init", res)

        this.#lastChatId = res.lastChatId
        if (res.onSale) {
            this.#start = true
            this.startTime().then()
        }
    }

    #startSendChatTimer = () => {
        this.#ChatTimer = setInterval(() => {
            if (this.#chatList.length) {
                const message = this.#chatList.shift()
                this.sendMessage(message).then()
            }
        }, 100)
    }

    pushMessage = (message) => {
        console.log("pushMessage", message)
        this.#chatList.push(message)
    }

    startGetChat = () => {
        this.#start = true

        this.getChat().then(() => {
            this.startTime().then()
        })
    }

    startTime = async () => {
        await Util.setDelay(100)
        const list = await this.getChat()
        if (list && list.length !== 0) {
            await API.sendChat({
                lastChatId: this.#lastChatId,
                data: list
            })
        }

        if (this.#start) {
            console.log("startTime start", this.#start)
            await this.startTime()
        }
    }

    endGetChat = () => {
        this.#start = false
    }

    sendMessage = async (message) => {
        console.log(`MessageController sendMessage ${message}`)
        this.#input.focus()
        this.#input.textContent = message
        this.#input.dispatchEvent(this.#inputEvent)
        this.#input.dispatchEvent(this.#keyDownEvent)

        this.#button.click()
        this.#button.dispatchEvent(this.#clickEvent)
    }

    setLastId = (id, offset) => {

        const getId = () => {
            const nodeList = document.querySelectorAll('yt-live-chat-text-message-renderer')
            let chatList = Array.from(nodeList)
            const index = chatList.findIndex(v => v.id === id)

            if (!offset || !id) {
                return chatList[chatList.length - 1].id
            } else if (index !== -1) {
                return chatList[index + offset].id
            } else {
                return undefined
            }
        }

        return new Promise(async resolve => {
            const t = setInterval(() => {
                const id = getId()

                if (!id) {
                    console.log(id)
                    clearInterval(t)
                    resolve()
                } else if (id.substring(0, 5) === 'ChwKG') {
                    this.#lastChatId = id
                    clearInterval(t)
                    resolve()
                } else {
                    console.log("setLastId", id)
                }
            }, 100)
        })
    }

    getChat = async () => {
        try {
            const nodeList = document.querySelectorAll('yt-live-chat-text-message-renderer')
            let chatList = Array.from(nodeList)

            chatList = chatList.filter(v => v.id.substring(0, 5) === 'ChwKG')
            let _chatList = chatList

            if (this.#lastChatId) {
                const lastChatIndex = chatList.findIndex(chat => chat.id === this.#lastChatId);
                if (lastChatIndex !== -1) {
                    _chatList = [...chatList.slice(lastChatIndex + 1)]
                }
            }

            //가저온 채팅이 하나도 없으면
            if (_chatList.length === 0) {
                return []
            }

            /**@type {{message: string, name: string}[]}**/
            const resList = []
            for (const item of _chatList) {
                const data = this.#getNameAndMessage(item)
                if (data) resList.push(data)
            }
            this.#lastChatId = _chatList[_chatList.length - 1].id

            return resList
        } catch (e) {
            console.log(e)
            return []
        }
    }
    #getNameAndMessage = (chat) => {
        const name = chat.childNodes[3].childNodes[1].childNodes[3].textContent
        const message = chat.childNodes[3].childNodes[3].textContent
        if (Util.isNumericString(message)) {
            return {
                name,
                message: parseInt(message)
            }
        } else {
            return null
        }
    }

}

export default new MessageController()