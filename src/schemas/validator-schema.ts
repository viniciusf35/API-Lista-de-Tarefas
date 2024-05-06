// schemas.ts
export const UserSchemas = {
  register: {
    body: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string', minLength: 1, errorMessage: "Nome não pode estar vazio." },
        email: { type: 'string', format: 'email', errorMessage: "Por favor, forneça um e-mail válido." },
        password: { type: 'string', minLength: 6, errorMessage: "Senha deve ter pelo menos 6 caracteres." }
      },
      errorMessage: {
        required: {
          name: 'O nome é obrigatório.',
          email: 'O e-mail é obrigatório.',
          password: 'A senha é obrigatória.'
        }
      }
    }
  },
  login: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email', errorMessage: "Por favor, forneça um e-mail válido." },
        password: { type: 'string', minLength: 6, errorMessage: "Senha deve ter pelo menos 6 caracteres." }
      },
      errorMessage: {
        required: {
          email: 'O e-mail é obrigatório.',
          password: 'A senha é obrigatória.'
        }
      }
    }
  },
  updateName: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', minLength: 1, errorMessage: "Nome não pode estar vazio." }
      },
      errorMessage: {
        required: {
          name: 'O nome é obrigatório.'
        }
      }
    }
  },
  updatePassword: {
    body: {
      type: 'object',
      required: ['password', 'newPassword'],
      properties: {
        password: { type: 'string', minLength: 6, errorMessage: "Senha atual deve ter pelo menos 6 caracteres." },
        newPassword: { type: 'string', minLength: 6, errorMessage: "Nova senha deve ter pelo menos 6 caracteres." }
      },
      errorMessage: {
        required: {
          password: 'A senha atual é obrigatória.',
          newPassword: 'A nova senha é obrigatória.'
        }
      }
    }
  }
};

  
export const TaskSchemas = {
  create: {
    body: {
      type: 'object',
      required: ['name', 'description'],
      properties: {
        name: { type: 'string', minLength: 1, errorMessage: "Nome não pode estar vazio." },
        description: { type: 'string', minLength: 1, errorMessage: "Descrição não pode estar vazia." }
      },
      errorMessage: {
        required: {
          name: 'O nome é obrigatório.',
          description: 'A descrição é obrigatória.'
        }
      }
    }
  },
  getUnique: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'integer', errorMessage: "ID inválido." }
      },
      errorMessage: {
        required: {
          id: 'O ID é obrigatório.'
        }
      }
    }
  },
  update: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'integer', errorMessage: "ID inválido." }
      },
      errorMessage: {
        required: {
          id: 'O ID é obrigatório.'
        }
      }
    },
    body: {
      type: 'object',
      required: ['name', 'description'],
      properties: {
        name: { type: 'string', minLength: 1, errorMessage: "Nome não pode estar vazio." },
        description: { type: 'string', minLength: 1, errorMessage: "Descrição não pode estar vazia." }
      },
      errorMessage: {
        required: {
          name: 'O nome é obrigatório.',
          description: 'A descrição é obrigatória.'
        }
      }
    }
  },
  delete: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'integer', errorMessage: "ID inválido." }
      },
      errorMessage: {
        required: {
          id: 'O ID é obrigatório.'
        }
      }
    }
  }
};
