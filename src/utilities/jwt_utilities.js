import { Auth } from 'aws-amplify';

export async function isTokenValid() {
    try {
        configureUserPool();
        const session = await Auth.currentSession();
        return session.isValid(); // Returns true if the session is valid, false otherwise
    } catch (error) {
        console.error('Error getting session:', error);
        return false; // Session is not valid or an error occurred
    }
}

export async function signOut() {
    try {
        configureUserPool();
        await Auth.signOut();
        return true;
    } catch (error) {
        console.error('Error signing out:', error);
        return false; // Session is not valid or an error occurred
    }
}

function configureUserPool() {
    Auth.configure({
        region: 'us-east-1',
        userPoolId: 'us-east-1_8WhvOPNCY',
        userPoolWebClientId: '1s5g80crh67e55ngbumui3qp33',
    });
}