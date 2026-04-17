package parcialfinal.example.gestiApar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "EMPLEADO")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDEMPLEADO")
    private Long id;

    @Column(name = "IDPERSONA")
    private Long idPersona;

    @Column(name = "CARGO")
    private String cargo;

    public Empleado() {}
}
