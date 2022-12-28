import { createContext, useState, useEffect, ReactNode } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // recuperação de dados do usuario para nao perde os dados

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    //  so que dara errro. vai que nao existe mais o estado de usuario algo assim..... Toda vez que declaramos um evento listem nos temos uma obrigação de descadastrar desse listem...

    // toda ves que declaramos um evento listem no react... e recomendado que salvamos este evento listem numa variavel  que chamos de
    // unsubscribe que para desligar o evento listem para parar de ficar ouvindo e recomendado que fazemos no retorno dele no useEffect de uma função que me descadastre de todo eventos listem
    //  que nos cadastramos claro so se tiver me cadastrando em um evento listem ... se nao fizer isso aqui, se por acaso este evento sair de tela o evento listem vai continuar rodando...

    return () => {
      unsubscribe();
    };
  }, []);

  async function signWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
