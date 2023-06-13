import threading
from queue import Queue
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage

from langchain_utilities.callbacks.stream_callback_handler import StreamingCallbackHandler


def stream_openai_response(messages):
    queue = Queue()

    llm = ChatOpenAI(
        openai_api_key='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',
        temperature=0.4,
        max_tokens=1000,
        streaming=True,
        callbacks=[StreamingCallbackHandler(queue)]
    )

    def generate():
        llm.generate([messages])

    generate_thread = threading.Thread(target=generate)
    generate_thread.start()

    try:
        while generate_thread.is_alive() or not queue.empty():
            yield queue.get()
    finally:
        generate_thread.join()


if __name__ == '__main__':
    messages = [SystemMessage(content="You are a helpful assistant that gives detailed answers."),
                HumanMessage(content="Who won the world series in 2020 and how did they win?")]
    for item in stream_openai_response(messages):
        print(item, end="")
