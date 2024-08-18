export default {
  async login(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB731MgCYEnRWUFt-TCxLAr5QgNpYJzHSc',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          retuenSecureToken: true,
        }),
      }
    );
    const responseData = response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          'Failed to authenticate. Check your Login data!'
      );
      throw error;
    }
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  async signup(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB731MgCYEnRWUFt-TCxLAr5QgNpYJzHSc',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          retuenSecureToken: true,
        }),
      }
    );
    const responseData = response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          'Failed to authenticate. Check your Signup data!'
      );
      throw error;
    }
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
