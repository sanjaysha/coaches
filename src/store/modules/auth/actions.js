export default {
  login() {},
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
      console.log(responseData, 'ResponseData');
      const error = new Error(
        responseData.message || 'Failed to authenticate!'
      );
      throw error;
    }
    console.log(responseData, 'no error ResponseData');
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
