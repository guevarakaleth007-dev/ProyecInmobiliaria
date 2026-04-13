package parcialfinal.example.gestiApar.model;

public class RegisterRequest {
    private String nombre;
    private String apellido;
    private String correo;
    private String telefono;
    private String domicilio;
    private Long idTipoPersona;
    private String nombreUsuario;
    private String clave;
    private Long idPerfil;

    public RegisterRequest() {}

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getDomicilio() { return domicilio; }
    public void setDomicilio(String domicilio) { this.domicilio = domicilio; }

    public Long getIdTipoPersona() { return idTipoPersona; }
    public void setIdTipoPersona(Long idTipoPersona) { this.idTipoPersona = idTipoPersona; }

    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }

    public String getClave() { return clave; }
    public void setClave(String clave) { this.clave = clave; }

    public Long getIdPerfil() { return idPerfil; }
    public void setIdPerfil(Long idPerfil) { this.idPerfil = idPerfil; }
}
