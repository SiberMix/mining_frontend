export type MessageSocketCallback<T> = (data: T) => void;

export class SocketManager<T> {
  socket: WebSocket | null = null
  address: string
  onMessageCallback?: MessageSocketCallback<T>

  constructor(address: string) {
    this.address = address
  }

  connect(onMessageCallback: MessageSocketCallback<T>) {
    this.onMessageCallback = onMessageCallback
    const callback = this.onMessageCallback // Сохраняем ссылку

    this.socket = new WebSocket(this.address)

    this.socket.onopen = () => {
      console.log(`Подключение к сокету с адресом: ${this.address}`)
    }

    this.socket.onclose = (event) => {
      console.log(`Отключение от сокета с адресом: ${this.address}`)
      if (!event.wasClean && callback) {
        // Если соединение было разорвано из-за ошибки, попробовать переподключиться через 3 секунды
        setTimeout(() => this.connect(callback), 3000)
      }
    }

    this.socket.onerror = (error) => {
      console.error('Произошла ошибка в сокете:', error)
      if (callback) {
        // Если соединение было разорвано из-за ошибки, попробовать переподключиться через 3 секунды
        setTimeout(() => this.connect(callback), 3000)
      }
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (callback) {
        callback(data)
      }
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
      console.log(`сокет с адресом ${this.address} отключен`)
    }
  }
}
