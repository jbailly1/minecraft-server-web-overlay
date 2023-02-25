export function useCustomCommand() {
    const send = async (command: string) => {
        try {
            await fetch(`/send?command=${command}`, {method: 'POST'});
        } catch {
            console.error('send command failed');
        }
    };

    return {
        send,
    }
}
