const swaggerDocument = {
    openapi: '3.0.0',
    info: {
      title: 'GymManager API',
      version: '1.0.0',
      description: 'Gym management API (members, plans, payments, workouts and check-ins).'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' }
              }
            },
            token: { type: 'string' }
          }
        },
        Plan: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            durationMonths: { type: 'integer' },
            price: { type: 'number', format: 'float' }
          }
        },
        Member: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            cpf: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
            phone: { type: 'string' },
            status: { type: 'string' },
            qrCode: { type: 'string' },
            planId: { type: 'integer' }
          }
        },
        Exercise: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            muscleGroup: { type: 'string' },
            description: { type: 'string' }
          }
        },
        WorkoutExerciseInput: {
          type: 'object',
          properties: {
            exerciseId: { type: 'integer' },
            sets: { type: 'integer' },
            reps: { type: 'string' },
            restSeconds: { type: 'integer' },
            observation: { type: 'string' }
          }
        },
        WorkoutSheet: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            memberId: { type: 'integer' },
            name: { type: 'string' }
          }
        },
        Payment: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            memberId: { type: 'integer' },
            planId: { type: 'integer' },
            amount: { type: 'number', format: 'float' },
            status: { type: 'string' },
            dueDate: { type: 'string', format: 'date' },
            paidAt: { type: 'string', format: 'date-time' }
          }
        },
        CheckInResponse: {
          type: 'object',
          properties: {
            member: {
              $ref: '#/components/schemas/Member'
            },
            checkIn: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                createdAt: { type: 'string', format: 'date-time' }
              }
            }
          }
        },
        DashboardSummary: {
          type: 'object',
          properties: {
            totalMembers: { type: 'integer' },
            activeMembers: { type: 'integer' },
            inactiveMembers: { type: 'integer' },
            todayCheckIns: { type: 'integer' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    paths: {
      '/health': {
        get: {
          tags: ['Health'],
          summary: 'API health check',
          responses: {
            200: {
              description: 'API OK'
            }
          }
        }
      },
      '/health/db': {
        get: {
          tags: ['Health'],
          summary: 'Database health check',
          responses: {
            200: { description: 'DB OK' },
            500: { description: 'DB error' }
          }
        }
      },
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Create admin/staff user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    role: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'User created' },
            400: { description: 'Validation error' },
            409: { description: 'Email already in use' }
          }
        }
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'User login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginRequest' }
              }
            }
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/LoginResponse' }
                }
              }
            },
            400: { description: 'Missing required fields' },
            401: { description: 'Invalid credentials' }
          }
        }
      },
      '/api/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Returns authenticated user',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Authenticated user' },
            401: { description: 'Invalid or missing token' }
          }
        }
      },
      '/api/plans': {
        get: {
          tags: ['Plans'],
          summary: 'List plans',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'List of plans',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Plan' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Plans'],
          summary: 'Create plan',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'durationMonths', 'price'],
                  properties: {
                    name: { type: 'string' },
                    durationMonths: { type: 'integer' },
                    price: { type: 'number', format: 'float' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Plan created' }
          }
        }
      },
      '/api/plans/{id}': {
        get: {
          tags: ['Plans'],
          summary: 'Plan details',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Plan found' },
            404: { description: 'Not found' }
          }
        },
        put: {
          tags: ['Plans'],
          summary: 'Update plan',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Plan' }
              }
            }
          },
          responses: {
            200: { description: 'Plan updated' }
          }
        },
        delete: {
          tags: ['Plans'],
          summary: 'Remove plan',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            204: { description: 'Removed' }
          }
        }
      },
      '/api/members': {
        get: {
          tags: ['Members'],
          summary: 'List members',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of members' }
          }
        },
        post: {
          tags: ['Members'],
          summary: 'Create member',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Member' }
              }
            }
          },
          responses: {
            201: { description: 'Member created' }
          }
        }
      },
      '/api/members/{id}': {
        get: {
          tags: ['Members'],
          summary: 'Member details',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Member found' },
            404: { description: 'Not found' }
          }
        },
        put: {
          tags: ['Members'],
          summary: 'Update member',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Member' }
              }
            }
          },
          responses: {
            200: { description: 'Member updated' }
          }
        },
        delete: {
          tags: ['Members'],
          summary: 'Remove member',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            204: { description: 'Removed' }
          }
        }
      },
      '/api/members/{id}/regenerate-qrcode': {
        post: {
          tags: ['Members'],
          summary: 'Regenerate member QR Code',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'QR Code regenerated' }
          }
        }
      },
      '/api/exercises': {
        get: {
          tags: ['Exercises'],
          summary: 'List exercises',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of exercises' }
          }
        },
        post: {
          tags: ['Exercises'],
          summary: 'Create exercise',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Exercise' }
              }
            }
          },
          responses: {
            201: { description: 'Exercise created' }
          }
        }
      },
      '/api/exercises/{id}': {
        get: {
          tags: ['Exercises'],
          summary: 'Exercise details',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'OK' },
            404: { description: 'Not found' }
          }
        },
        put: {
          tags: ['Exercises'],
          summary: 'Update exercise',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Exercise' }
              }
            }
          },
          responses: {
            200: { description: 'Updated' }
          }
        },
        delete: {
          tags: ['Exercises'],
          summary: 'Remove exercise',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            204: { description: 'Removed' }
          }
        }
      },
      '/api/members/{memberId}/workouts': {
        get: {
          tags: ['Workouts'],
          summary: 'List member workout sheets',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'memberId', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'List of workout sheets' }
          }
        },
        post: {
          tags: ['Workouts'],
          summary: 'Create A/B/C workout sheet for member',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'memberId', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string' },
                    exercises: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/WorkoutExerciseInput' }
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Workout sheet created' }
          }
        }
      },
      '/api/workouts/{id}': {
        get: {
          tags: ['Workouts'],
          summary: 'Workout sheet details with exercises',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'OK' },
            404: { description: 'Not found' }
          }
        },
        put: {
          tags: ['Workouts'],
          summary: 'Update workout sheet and exercises (replace)',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    exercises: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/WorkoutExerciseInput' }
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Updated' }
          }
        },
        delete: {
          tags: ['Workouts'],
          summary: 'Remove workout sheet',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            204: { description: 'Removed' }
          }
        }
      },
      '/api/payments': {
        get: {
          tags: ['Payments'],
          summary: 'List payments',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'memberId', in: 'query', schema: { type: 'integer' } },
            { name: 'status', in: 'query', schema: { type: 'string' } }
          ],
          responses: {
            200: { description: 'List of payments' }
          }
        },
        post: {
          tags: ['Payments'],
          summary: 'Create payment',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['memberId', 'planId'],
                  properties: {
                    memberId: { type: 'integer' },
                    planId: { type: 'integer' },
                    amount: { type: 'number', format: 'float' },
                    status: { type: 'string' },
                    dueDate: { type: 'string', format: 'date' },
                    paidAt: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Payment created' }
          }
        }
      },
      '/api/payments/{id}': {
        get: {
          tags: ['Payments'],
          summary: 'Payment details',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'OK' },
            404: { description: 'Not found' }
          }
        }
      },
      '/api/payments/{id}/pay': {
        patch: {
          tags: ['Payments'],
          summary: 'Mark payment as paid',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Updated to paid' }
          }
        }
      },
      '/api/checkins': {
        post: {
          tags: ['Checkins'],
          summary: 'Perform check-in via QR Code',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['qrCode'],
                  properties: {
                    qrCode: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Check-in registered',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CheckInResponse' }
                }
              }
            }
          }
        }
      },
      '/api/checkins/today': {
        get: {
          tags: ['Checkins'],
          summary: 'List today\'s check-ins',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of check-ins' }
          }
        }
      },
      '/api/dashboard/summary': {
        get: {
          tags: ['Dashboard'],
          summary: 'Summary of members and check-ins',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Summary',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/DashboardSummary' }
                }
              }
            }
          }
        }
      }
    }
  }
  
  export default swaggerDocument
  