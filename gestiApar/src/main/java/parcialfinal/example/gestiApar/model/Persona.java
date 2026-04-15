package parcialfinal.example.gestiApar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "PERSONA")
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_persona")
    @SequenceGenerator(name = "seq_persona", sequenceName = "SEQ_PERSONA", allocationSize = 1)
    @Column(name = "IDPERSONA")
    private Long id;

    @Column(name = "IDTIPOPERSONA")
    private Long idTipoPersona;

    @Column(name = "NOMBRE")
    private String nombre;

    @Column(name = "APELLIDO")
    private String apellido;

    @Column(name = "DOMICILIO")
    private String domicilio;

    @Column(name = "TELEFONO")
    private String telefono;

    @Column(name = "CORREO")
    private String correo;

    public Persona() {}
}
