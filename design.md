# Sistema de Inventario Herramientas
## Arquitectura Moderna y Minimalista

### Visión General
Aplicación full-stack separada en frontend React y backend Node.js/Express con comunicación RESTful y autenticación JWT.

```mermaid
graph TD
    A[Usuario] --> B(Frontend React/Vite)
    B -->|HTTPS| C[Backend API Node/Express]
    C -->|SQL| D[(PostgreSQL)]
    C -->|Documenta| E[Swagger UI]
    style B fill:#f9f9f9,stroke:#333,stroke-width:1px
    style C fill:#f9f9f9,stroke:#333,stroke-width:1px
    style D fill:#f9f9f9,stroke:#333,stroke-width:1px
    style E fill:#f9f9f9,stroke:#333,stroke-width:1px
```

### Módulos Actuales

**Frontend (`/frontend-app`)**
- React 19 + Vite + TypeScript
- Enrutamiento básico (react-router-dom pendiente)
- Comunicación API mediante fetch/axios (por implementar)
- Estado local de componentes (pendiente de Context/Zustand)

**Backend (`/herramientas-node-api`)**
- Express 5 + Sequelize ORM
- Arquitectura en capas:
  - Routes → Controllers → Models
  - Middleware de autenticación y manejo de errores
  - Documentación automática con Swagger
- Modelos: Usuario, Producto, Categoria, Cliente, Venta, DetalleVenta

### Oportunidades de Mejora

#### Frontend
- ⚡ Estado global: Implementar Zustand o Jotai (minimalista)
- 🎨 UI Library: Adoptar shadcn/ui o Radix Primitives
- 🔄 Data Fetching: React Query para caché y sincronización
- 🧪 Testing: Vitest + React Testing Library
- 📱 PWA: Workbox para capacidades offline

#### Backend
- ⚡ Performance: Implementar Redis para caché de consultas frecuentes
- 🔒 Seguridad: Helmet.js, rate limiting, validación avanzada con Joi
- 📊 Observabilidad: Winston logger + tracking de requests
- ♻️ Arquitectura: Considerar hexagonal/clean architecture para escalabilidad
- 🧪 Testing: Jest + Supertest para pruebas de integración

#### Infraestructura
- 🐳 Docker Compose para desarrollo consistente
- 🌐 Variables de entorno tipificadas con zod
- 📦 CI/CD básico con GitHub Actions
- 📋 Documentación: Storybook para componentes frontend

### Arquitectura Propuesta (Minimalista)

```mermaid
graph LR
    subgraph Frontend
        A[React 19] --> B[Vite]
        B --> C[TypeScript]
        C --> D[Zustand]
        C --> E[React Query]
        C --> F[shadcn/ui]
    end
    
    subgraph Backend
        G[Express 5] --> H[Sequelize]
        H --> I[PostgreSQL]
        G --> J[Swagger]
        G --> K[Winston Logger]
        G --> L[Redis Cache]
    end
    
    F -->|REST/JSON| G
    style Frontend fill:#f9f9f9,stroke:#333,stroke-width:1px
    style Backend fill:#f9f9f9,stroke:#333,stroke-width:1px
```

### Flujo de Datos Ejemplo

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant B as Backend
    participant DB as PostgreSQL
    
    U->>F: Click en "Nuevo Producto"
    F->>F: Validar formulario (Zustand)
    F->>B: POST /api/productos (React Query)
    B->>B: Validar datos (Joi)
    B->>DB: INSERT producto
    DB-->>B: Confirmación
    B-->>F: 201 + datos producto
    F->>F: Actualizar lista (React Query)
    F-->>U: Mostrar éxito
```

### Principios de Diseño
1. **Separación clara de responsabilidades** - Cada capa tiene un único propósito
2. **Minimalismo activo** - Solo agregar dependencias que resuelvan problemas reales
3. **Tipo fuerte end-to-end** - TypeScript en frontend, validación estricta en backend
4. **Documentación como código** - Swagger actualizado automáticamente, comentarios JSDoc
5. **Observabilidad inherente** - Logging estructurado y métricas básicas desde el inicio

### Próximos Pasos
1. Implementar Zustand para estado global en frontend
2. Agregar React Query para manejo de estado de servidor
3. Mejorar validación backend con Joi
4. Configurar Docker Compose para desarrollo
5. Establecer pipeline básico de CI

---
*Diseño pensado para evolucionar con el producto, no para sobreingeniería desde el inicio.*