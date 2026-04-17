package parcialfinal.example.gestiApar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parcialfinal.example.gestiApar.model.*;
import parcialfinal.example.gestiApar.repository.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private tipoPersonaRepository tipoPersonaRepository;

    @Autowired
    private PerfilRepository perfilRepository;

    // ──────────── REGISTRO ────────────
    public Map<String, Object> registrar(RegisterRequest req) {
        Map<String, Object> result = new HashMap<>();

        // Validar que el nombre de usuario no exista usando COUNT (compatible Oracle 10g)
        long count = usuarioRepository.countByNombreUsuario(req.getNombreUsuario());
        if (count > 0) {
            result.put("exito", false);
            result.put("mensaje", "El nombre de usuario ya está en uso.");
            return result;
        }

        // Determinar idTipoPersona y validar que exista en BD
        Long idTipoPersona = req.getIdTipoPersona() != null ? req.getIdTipoPersona() : 27L;
        if (!tipoPersonaRepository.existsById(idTipoPersona)) {
            // Usar el primer tipo disponible como fallback
            java.util.List<parcialfinal.example.gestiApar.model.tipoPersona> tipos = tipoPersonaRepository.findAll();
            if (tipos.isEmpty()) {
                result.put("exito", false);
                result.put("mensaje", "No hay tipos de persona configurados en el sistema. Contacte al administrador.");
                return result;
            }
            idTipoPersona = tipos.get(0).getId();
        }

        // Determinar idPerfil y validar que exista en BD
        Long idPerfil = req.getIdPerfil() != null ? req.getIdPerfil() : 2L;
        if (!perfilRepository.existsById(idPerfil)) {
            java.util.List<Perfil> perfiles = perfilRepository.findAll();
            if (perfiles.isEmpty()) {
                result.put("exito", false);
                result.put("mensaje", "No hay perfiles configurados en el sistema. Contacte al administrador.");
                return result;
            }
            idPerfil = perfiles.get(0).getId();
        }

        // 1. Guardar Persona
        Persona persona = new Persona();
        persona.setNombre(req.getNombre());
        persona.setApellido(req.getApellido());
        persona.setCorreo(req.getCorreo());
        persona.setTelefono(req.getTelefono());
        persona.setDomicilio(req.getDomicilio());
        persona.setIdTipoPersona(idTipoPersona);
        Persona personaGuardada = personaRepository.save(persona);

        // 2. Guardar Usuario
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario(req.getNombreUsuario());
        usuario.setClave(req.getClave());
        usuario.setIdPersona(personaGuardada.getId());
        usuario.setIdPerfil(idPerfil);
        usuarioRepository.save(usuario);

        result.put("exito", true);
        result.put("mensaje", "Usuario registrado exitosamente.");
        return result;
    }

    // ──────────── LOGIN ────────────
    public Map<String, Object> login(LoginRequest req) {
        Map<String, Object> result = new HashMap<>();

        // Usamos List para evitar FETCH FIRST de Oracle 10g
        List<Usuario> usuarios = usuarioRepository.findByNombreUsuario(req.getNombreUsuario());

        if (usuarios.isEmpty()) {
            result.put("exito", false);
            result.put("mensaje", "Usuario no encontrado.");
            return result;
        }

        Usuario usuario = usuarios.get(0);

        if (!usuario.getClave().equals(req.getClave())) {
            result.put("exito", false);
            result.put("mensaje", "Contraseña incorrecta.");
            return result;
        }

        // Obtener datos de la persona asociada
        Optional<Persona> optPersona = personaRepository.findById(usuario.getIdPersona());
        String nombreCompleto = optPersona
                .map(p -> p.getNombre() + " " + p.getApellido())
                .orElse("Usuario");

        result.put("exito", true);
        result.put("mensaje", "Login exitoso.");
        result.put("idUsuario", usuario.getId());
        result.put("nombreUsuario", usuario.getNombreUsuario());
        result.put("nombreCompleto", nombreCompleto);
        result.put("idPerfil", usuario.getIdPerfil());
        return result;
    }
}
