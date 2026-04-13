package parcialfinal.example.gestiApar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "USUARIO")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDUSUARIO")
    private Long id;

    @Column(name = "USERNAME")
    private String nombreUsuario;

    @Column(name = "PASSWORD")
    private String clave;

    @Column(name = "IDPERSONA")
    private Long idPersona;

    @Column(name = "IDPERFIL")
    private Long idPerfil;

    public Usuario() {}
}
