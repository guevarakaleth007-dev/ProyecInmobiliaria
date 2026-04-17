package parcialfinal.example.gestiApar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "PROPIETARIO")
public class Propietario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPROPIETARIO")
    private Long id;

    @Column(name = "IDPERSONA")
    private Long idPersona;

    public Propietario() {}
}
